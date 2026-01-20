pipeline {
    agent any

    environment {
        IMAGE_NAME = "collegeapplicationform_backend"
        REGISTRY   = "abhiyadav260"
        TAG        = "latest"
        DB_HOST    = "database-clg.cducwmmw2d0n.ap-south-1.rds.amazonaws.com"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/YadavAbhishek03/CollegeApplicationForm.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t ${REGISTRY}/${IMAGE_NAME}:${TAG} \
                    -f Dockerfile .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                        -u "$DOCKER_USER" --password-stdin

                        docker push ${REGISTRY}/${IMAGE_NAME}:${TAG}
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                withCredentials([
                    string(credentialsId: 'db-user', variable: 'DB_USER'),
                    string(credentialsId: 'db-password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'db-name', variable: 'DB_NAME')
                ]) {
                    sh '''
                        export DB_HOST=${DB_HOST}
                        export DB_USER=${DB_USER}
                        export DB_PASSWORD=${DB_PASSWORD}
                        export DB_NAME=${DB_NAME}

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
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}

