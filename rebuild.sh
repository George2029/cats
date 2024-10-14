docker compose down && docker image rm cat-pinterest-front:latest || true && docker image rm cat-pinterest-api:latest || true && docker image rm vk-migration-runner || true && docker compose up -d
