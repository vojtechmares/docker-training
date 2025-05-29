FROM node:22

EXPOSE 3000
ENV PORT=3000

COPY package.json package-lock.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install --frozen-lockfile

ENV NODE_ENV=production

COPY . .

RUN npm run build

CMD ["node", "build/main.js"]
