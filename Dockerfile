FROM node:8-onbuild

MAINTAINER Sebastian Salata R-T <SA.SalataRT@GMail.com>

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
