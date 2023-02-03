# Choose a base image with Python installed
FROM python:3.7

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Start the analytics service
CMD [ "python", "app.py" ]
