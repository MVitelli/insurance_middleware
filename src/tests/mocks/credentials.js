import dotEnv from "dotenv";

dotEnv.config();

const adminCredentials = {
  username: "Manning",
  password: process.env.CLIENT_SECRET,
};

const loginResponse = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZmQxNTliLTU3YzQtNGQzNi05YmQ3LWE1OWNhMTMwNTdiYiIsIm5hbWUiOiJNYW5uaW5nIiwiZW1haWwiOiJtYW5uaW5nYmxhbmtlbnNoaXBAcXVvdGV6YXJ0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzMjU5OTc3OSwiZXhwIjoxNjMyNjAxNTc5fQ.yg7jinTp-aRorm_aOw-yhY-BKZP5vRQceHZasKZZM5M",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZmQxNTliLTU3YzQtNGQzNi05YmQ3LWE1OWNhMTMwNTdiYiIsIm5hbWUiOiJNYW5uaW5nIiwiZW1haWwiOiJtYW5uaW5nYmxhbmtlbnNoaXBAcXVvdGV6YXJ0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzMjU5OTc3OSwiZXhwIjoxNjMyNjIxMzc5fQ.4ZG22aCYhMydZueDiVzwEsDGe3xLpfc_WVdZdfCBLQg",
  type: "Bearer",
  expires_in: "30m",
};

export { adminCredentials, loginResponse };
