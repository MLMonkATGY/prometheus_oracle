FROM mcr.microsoft.com/playwright:v1.17.1-focal
RUN git clone --branch feat-2 https://github.com/alextaygeeyang/prometheus_oracle.git
WORKDIR /prometheus_oracle
RUN npm ci
ENTRYPOINT [ "/bin/bash" ]