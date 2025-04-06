pipeline {
    agent any

    environment {
        // Set environment variables for your project
        IMAGE_NAME = "collegeapplicationform_backend"
        REGISTRY = "abhiyadav260"
        TAG = "latest"
        DOCKERFILE = "Dockerfile"
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        DB_HOST = "database-1.cl0qgyukm509.ap-southeast-1.rds.amazonaws.com"  // Change to your DB host if needed
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository from GitHub (or other VCS)
                git branch: 'main', url: 'https://github.com/sanbhi/CollegeApplicationForm.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t abhiyadav260/collegeapplicationform_backend:latest -f Dockerfile ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub (or your registry)
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'username', passwordVariable: 'password')]) {
                        sh "docker login -u username -p password"
                    }
                    // Push the Docker image to your registry
                    sh "docker push abhiyadav260/collegeapplicationform_backend:latest"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Run the Docker Compose commands to deploy your app
                    sh "docker-compose -f docker-compose.yml up -d"
                }
            }
        }

        stage('Post-Deployment Cleanup') {
            steps {
                script {
                    // Optionally clean up unused Docker images and containers
                    sh "docker system prune -f"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}
