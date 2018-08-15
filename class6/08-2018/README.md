# Universal Pattern module.

Universal Pattern (https://github.com/lortmorris/universal-pattern).


# Microservices


api.website.com/users
api.website.com/posts
api.website.com/stats


Server: instance => core (PM2, nginx, etc.)
Server => :5000 (nginx - PM2) => output


```text
#Server1: users
location /users {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    # PM2 or each instances.
    proxy_pass http://localhost:8000;
    proxy_pass http://localhost:8001;
    proxy_pass http://localhost:8002;
    proxy_pass http://localhost:8003;
}
```

```text
#Server2: posts
location /posts {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    # PM2 or each instances.
    proxy_pass http://localhost:8000;
    proxy_pass http://localhost:8001;
    proxy_pass http://localhost:8002;
    proxy_pass http://localhost:8003;
}
```


```text
#Server3: stats
location /stats {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    # PM2 or each instances.
    proxy_pass http://localhost:8000;
    proxy_pass http://localhost:8001;
    proxy_pass http://localhost:8002;
    proxy_pass http://localhost:8003;
}
```

[
server1,
server2,
server3
] => ELB

[server1, server1] => ELB1
[server2, server2] => ELB2
[server3, server3] => ELB3

[ELB1, ELB2, ELB3] => ELBMaster



# AWS.
