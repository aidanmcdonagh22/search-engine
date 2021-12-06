#! /bin/bash

input="/tmp/garment_items.jl"

echo "Running import script..."

while IFS= read -r line; do
    echo "$line" > /tmp/garment.json
    mongoimport \
        -u "${MONGO_INITDB_ROOT_USERNAME}" \
        -p "${MONGO_INITDB_ROOT_PASSWORD}" \
        --authenticationDatabase "admin" \
        -h="${MONGO_HOST}" -d="${MONGO_DB_NAME}" \
        -c="${MONGO_COLLECTION_NAME}s" \
        --type=json --file=/tmp/garment.json
done < "$input"

echo "Finished import script!"

