// server.js
const express = require('express');
const AccessToken = require('livekit-server-sdk').AccessToken;

const createToken = () => {
  // if this room doesn't exist, it'll be automatically created when the first
  // client joins
  const roomName = 'link';
  // identifier to be used for participant.
  // it's available as LocalParticipant.identity with livekit-client SDK
  const participantName = 'dev';

  const at = new AccessToken(`${process.env.LK_API_KEY}`, `${process.env.LK_API_SECRET}`, {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
}

const app = express();
const port = 3000;

app.get('/getToken', (req, res) => {
  res.send(createToken());
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})