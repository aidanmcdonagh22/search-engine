FROM mongo:latest

COPY ./garment_items.jl /tmp/garment_items.jl

COPY ./import.sh /tmp/import.sh

RUN chmod +x /tmp/import.sh

CMD ["./tmp/import.sh"]