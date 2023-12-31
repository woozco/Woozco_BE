FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:16-alpine
ENV NODE_ENV production
COPY --from=builder /app ./
CMD ["yarn","start:prod"]
