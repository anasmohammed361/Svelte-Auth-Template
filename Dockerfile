# Step 1: Build the application
FROM oven/bun:latest 

# Set the working directory in the container
WORKDIR /app

# Copy all the application files to the container
COPY . .

# Run your build process
RUN bun i
RUN bun run build

# COPY --from=builder /app/.env .
# Expose the port the application will run on

#Start the BUN server
CMD ["bun","build/index.js"]