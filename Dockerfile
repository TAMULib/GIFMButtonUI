# Settings.
ARG USER_ID=3001
ARG USER_NAME=gif4me
ARG HOME_DIR=/$USER_NAME
ARG SOURCE_DIR=$HOME_DIR/source
ARG NPM_REGISTRY_URL=upstream
ARG NODE_ENV=development

# Node stage.
FROM node:lts-slim as build
ARG USER_ID
ARG USER_NAME
ARG HOME_DIR
ARG SOURCE_DIR
ARG NPM_REGISTRY_URL
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Create the group (use a high ID to attempt to avoid conflits).
RUN groupadd --non-unique -g $USER_ID $USER_NAME

# Create the user (use a high ID to attempt to avoid conflits).
RUN useradd --non-unique -d $HOME_DIR -m -u $USER_ID -g $USER_ID $USER_NAME

# Update the system.
RUN apt-get update && apt-get upgrade -y

# Ensure "ip" is available.
RUN apt install iproute2 -y

# Copy files over.
COPY . $SOURCE_DIR

# Copy NPM registry helper script.
COPY build/docker-npmrc.sh $SOURCE_DIR/docker-npmrc.sh

# Assign file permissions.
RUN chown -R ${USER_ID}:${USER_ID} ${SOURCE_DIR}

# Set deployment directory.
WORKDIR $SOURCE_DIR

# Login as user.
USER $USER_NAME

# Perform actions.
RUN echo $NPM_REGISTRY_URL
RUN bash docker-npmrc.sh $NPM_REGISTRY_URL
RUN npm install
RUN npm run build

# Nginx stage.
FROM nginx:alpine
ARG SOURCE_DIR

# Cleanup user share nginx web root.
RUN rm -rf /usr/share/nginx/html/*

# Move in source, service configurations and docker entrypoint.
# Copy dist to webroot.
COPY --from=build $SOURCE_DIR/dist /usr/share/nginx/html
COPY build/appConfig.js.template /usr/local/app/templates/appConfig.js.template
COPY build/default.conf.template /usr/local/nginx/templates/default.conf.template
COPY build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid

# Enable execute of docker entrypoint for root user.
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Must not have a trailing slash.
ENV BASE_PATH /get-it

ENV GOOGLE_ANALYTICS UA-XXXXX-X

ENV AUTH_SERVICE_URL http://localhost:9001/auth
ENV WEB_SERVICE_URL http://localhost:9001
ENV COMPONENTS_URL https://labs.library.tamu.edu/tl-components/2x

EXPOSE 80

# Entrypoint to perform environment substitution on appConfig.js and default.conf
# and places base href with $BASE_PATH in index.html.
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
