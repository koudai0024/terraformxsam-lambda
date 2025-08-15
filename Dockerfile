FROM public.ecr.aws/docker/library/node:20 AS build
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /var/task
COPY --from=build /opt/app ./
CMD [ "index.handler" ]
