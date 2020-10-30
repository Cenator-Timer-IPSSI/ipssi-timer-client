#----------Development Mode--------
# pull official base image
#FROM node:13.12.0-alpine

# set nodejs environnement
#ENV NODE_ENV=development

# set working directory
#WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# copy some files, check npm cache and install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm cache verify
#RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent

# add app files inside the container
#COPY . ./

# Custom manip to avoid problems
#ADD src /home/node/app/src
#ADD public home/node/app/public

# Build the project for production
#RUN npm build

# start app
#CMD ["npm", "start"]
#----------Production Mode--------
# set the base image
# n/b: for production, node is only used for building
# the static Html and javascript files
# as react creates static html and js files after build
# these are what will be served by nginx
# use alias build to be easier to refer this container elsewhere
# e.g inside nginx container
FROM node:alpine as build
# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
# as opposed to on dev, in prod everything is copied to docker
COPY . /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache dependencies
RUN yarn
#build the project for production
RUN yarn build

# Stage - Production
# set up production environment
# the base image for this is an alpine based nginx image
FROM nginx:alpine
# copy the build folder from react to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html
# ---------  For react router purpose ----------
# if you are using react router
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx/nginx.conf /etc/nginx/conf.d
# --------- /only for those using react router ----------
# expose port 80 to the outer world
EXPOSE 80
# start nginx
CMD ["nginx", "-g", "daemon off;"]
