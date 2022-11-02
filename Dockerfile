# Settings.
ARG USER_ID=3001
ARG USER_NAME=gif4me
ARG SOURCE_DIR=/$USER_NAME/source
ARG NPM_REGISTRY=upstream
ARG NODE_ENV=development

# Node stage.
FROM node:16-slim as build
ARG USER_ID
ARG USER_NAME
ARG SOURCE_DIR
ARG NPM_REGISTRY
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Create the user and group (use a high ID to attempt to avoid conflicts).
RUN groupadd --non-unique -g $USER_ID $USER_NAME && \
    useradd --non-unique -d /$USER_NAME -m -u $USER_ID -g $USER_ID $USER_NAME

# Update the system and install dependencies (iproute2 is needed for "ip").
RUN apt-get update && \
    apt-get upgrade -y && \
    apt install iproute2 -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy in files from outside of docker.
COPY . $SOURCE_DIR

# Ensure required file permissions.
RUN chown -R $USER_ID:$USER_ID $SOURCE_DIR

# Set deployment directory.
WORKDIR $SOURCE_DIR

# Login as user.
USER $USER_NAME

# Perform actions.
RUN echo $NPM_REGISTRY && \
    bash build/docker-npmrc.sh $NPM_REGISTRY && \
    npm install && \
    npm run build

# Nginx stage.
FROM nginx:alpine
ARG SOURCE_DIR

# Cleanup user share nginx web root.
RUN rm -rf /usr/share/nginx/html/*

# Copy in files from outside of docker.
COPY --from=build $SOURCE_DIR/dist /usr/share/nginx/html
COPY build/appConfig.js.template /usr/local/app/templates/appConfig.js.template
COPY build/default.conf.template /usr/local/nginx/templates/default.conf.template
COPY build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /var/run/nginx.pid && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# Must not have a trailing slash.
ENV BASE_PATH /get-it

ENV GOOGLE_ANALYTICS UA-XXXXX-X

ENV AUTH_SERVICE_URL https://labs.library.tamu.edu/auth/2x
ENV WEB_SERVICE_URL http://localhost:9000
ENV COMPONENTS_URL https://labs.library.tamu.edu/tl-components/2x

EXPOSE 80

# Entrypoint performs environment substitution on appConfig.js, and default.conf.
# Entrypoint replaces base href with $BASE_PATH in index.html.
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
