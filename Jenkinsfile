pipeline {
    agent any

    environment {
        // Set environment variables for your project
        IMAGE_NAME = "collegeapplicationform_backend"
        REGISTRY = "abhiyadav260"
        TAG = "latest"
        DOCKERFILE = "Dockerfile"
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        DB_HOST = "database-clg.cducwmmw2d0n.ap-south-1.rds.amazonaws.com"  // Change to your DB host if needed
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository from GitHub (or other VCS)
                git branch: 'main', url: 'https://github.com/YadavAbhishek03/CollegeApplicationForm.git'
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
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                     	  echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
  			'''
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
                    sh '''
			docker-compose down
			docker-compose pull 
			docker-compose up -d
		    '''
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
