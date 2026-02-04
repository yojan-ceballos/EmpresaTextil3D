# Builder Stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod ./
# COPY go.sum ./
# RUN go mod download

COPY . .

RUN go build -o main ./cmd/api

# Runner Stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .
COPY --from=builder /app/analysis ./analysis

# Install Python for analysis service
RUN apk add --no-cache python3 py3-pip

EXPOSE 3000

CMD ["./main"]
