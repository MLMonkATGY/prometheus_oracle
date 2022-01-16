FROM mcr.microsoft.com/playwright:v1.17.1-focal
RUN git clone --branch main https://github.com/alextaygeeyang/prometheus_oracle.git
WORKDIR /prometheus_oracle
RUN npm ci
RUN npm test
ENTRYPOINT [ "/bin/bash" ]