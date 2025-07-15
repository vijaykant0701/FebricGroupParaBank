pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Setup') {
            steps {
                script {
                    // Install Node.js
                    nvmInstall = "nvm install ${env.NODE_VERSION} && nvm use ${env.NODE_VERSION}"
                    sh(script: nvmInstall)
                    
                    // Install dependencies
                    sh 'npm install'
                }
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Test') {
            parallel {
                stage('UI Tests') {
                    steps {
                        sh 'npm run test:ui'
                    }
                }
                stage('API Tests') {
                    steps {
                        sh 'npm run test:api'
                    }
                }
            }
        }
        
        stage('Report') {
            steps {
                // Archive test results
                junit '**/test-results/*.xml'
                
                // Generate HTML report
                sh 'npx playwright show-report'
                
                // Archive HTML report
                archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            }
        }
    }
    
    post {
        always {
            // Clean up
            sh 'rm -rf node_modules'
            
            // Notify build status
            emailext body: '${DEFAULT_CONTENT}\n\n${BUILD_URL}', 
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], 
                subject: '${DEFAULT_SUBJECT}'
        }
    }
}