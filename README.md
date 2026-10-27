# 🍽️ Restaurant Tracking System

## Overview

Restaurant Tracking System is a cloud-native microservice application built using Node.js, MongoDB, Docker, and Kubernetes.
## Microservices

### Frontend Service
### Menu Service
### Order Service
### MongoDB
## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Docker
- Kubernetes
## Docker Commands

### Frontend

```bash
docker build -t 220588/frontend:latest .
docker push 220588/frontend:latest
```

### Menu Service

```bash
docker build -t 220588/menu-service:latest .
docker push 220588/menu-service:latest
```

### Order Service

```bash
docker build -t 220588/order-service:latest .
docker push 220588/order-service:latest
```

### MongoDB

```bash
docker pull mongo
```

---

## Kubernetes Deployment

Apply all resources:

```bash
kubectl apply -f .
```

Verify pods:

```bash
kubectl get pods
```

Verify services:

```bash
kubectl get svc
```

Verify persistent storage:

```bash
kubectl get pvc

## Service Endpoints
frontend
http://localhost:30080

Menu API:
http://localhost:30000/menu

Order API:
http://localhost:30001/orders

## Horizontal Scaling
kubectl scale deployment order-service --replicas=5

kubectl scale deployment menu-service --replicas=5

## Author

Sheetal Meher

kubectl get pvc
```
