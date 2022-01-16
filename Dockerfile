FROM mcr.microsoft.com/playwright:v1.17.1-focal
RUN git clone --branch dev-ci https://github.com/alextaygeeyang/prometheus_oracle.git
WORKDIR /prometheus_oracle
RUN npm ci
ENTRYPOINT [ "/bin/bash" ]