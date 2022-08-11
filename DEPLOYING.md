<a name="readme-top"></a>
# Get It For Me Button UI Deployment Guide

## Production Deployments

For **production** deployments, deploy using `docker-compose` via the [GIFM Button App Repo][app-repo].
This is the recommended method of deployment for production systems.
Go to the [GIFM Button App Repo][app-repo] and following the deployment instructions there.

Performing the deployment using the [GIFM Button App Repo][app-repo] should be something similar to the following:
```shell
docker-compose up
```

The **development** deployment can also use `docker-compose` in the same way.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Development Deployment using **Docker**

To manually use `docker` rather than `docker-compose`, run the following:

```shell
docker image build -t project .
docker run -it project
```

<sub>_* Note: `-t project` and `-it project` may be changed to another tag name as desired, such as `-t developing_on_this` and `-it developing_on_this`._</sub><br>
<sub>_** Note: An additional step may be required, such as deploying along side a! [Weaver UI Core][weaver-ui] instance using [Verdaccio][verdaccio]._</sub>

To deploy along side a [Weaver UI Core][weaver-ui] instance using [Verdaccio][verdaccio], do the following *before* deploying:

```shell
cd Weaver-UI-Core
docker image build -t weaver-ui .
docker run -it weaver-ui
```

The host system affects the network being used and is different from **Windows** to **Mac** to **Linux**.
* The `--network=` argument may be needed to assist with this, such as `--network=weaver`.
* The `--build-arg` may be needed to use the appropriate **NPM** registry settings, such as `--build-arg=NPM_REGISTRY="docker-linux"`.
* More network related changes may be required, so please consult the appropriate **Docker** documentation.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Development Deployment using **NPM**

Manual installation can be summed up by running:

```shell
npm install
npm run build
npm run start
```

Those steps are a great way to start but they also fail to explain the customization that is often needed.
There are multiple ways to further configure this for deployment to better meet the desired requirements.

It is highly recommended only to perform *manual installation* when developing.
For production deployment, please use `docker-compose` via the [GIFM Button App Repo][app-repo] or use the **Docker** method above.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


### Directly Configuring the `dist/appConfig.js` File

This method of configuration works by altering the built distribution configuration file.
This file is deleted every time either `npm run build` or `npm run clean` are run.
But in the event that a quick and manual change is needed, this is the simplest way to do so.

With this in mind, the deployment steps now look like:

```shell
npm install
npm run build
dist/appConfig.js
npm run start
```

<sub>_* Remember, changes to `dist/appConfig.js` are lost every time `npm run build` is run._</sub>

<div align="right">(<a href="#readme-top">back to top</a>)</div>


### Directly Configuring the `.wvr/build-config.js` Build File

This method of configuration is only recommended for `advanced uses` but is otherwise not recommended.
The advantage of this method of configuration is that of preserving the changes between _build_ or _clean_ commands.
There is only a small section that should be changed.

The `.wvr/build-config.js` file has only a single section of interest and might look something like this:
```js
    {
      from: './build/appConfig.js.template',
      to: './appConfig.js',
      transform(content) {
        return content
          .toString()
          .replace('${STOMP_DEBUG}', 'false')
          .replace('${AUTH_SERVICE_URL}', 'https://labs.library.tamu.edu/authfix')
          .replace('${WEB_SERVICE_URL}', 'http://localhost:9001/products');
      },
    },
```
In the above example snippet, only the lines containing `'${STOMP_DEBUG}'`, `'${AUTH_SERVICE_URL}'`, and `'${WEB_SERVICE_URL}'` should be changed.
For example `'http://localhost:9001/products'` could be changed to `'http://localhost:8181/products'` (changing the port number from 9001 to 8181).

Once this is done all of the steps from *Development Deployment using NPM* above can be followed.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


<!-- LINKS -->
[app-repo]: https://github.com/TAMULib/GIFMButton
[weaver-ui]: https://github.com/TAMULib/Weaver-UI-Core
[verdaccio]: https://verdaccio.org
