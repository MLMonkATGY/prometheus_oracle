FROM mcr.microsoft.com/playwright:v1.17.1-focal
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs
RUN git clone --branch master https://github.com/alextaygeeyang/prometheus_oracle.git
WORKDIR /prometheus_oracle
RUN npm ci
RUN npm test
ENTRYPOINT ["npm", "start"]