# Automatic Dispatch

## Virloc 10
Send: 20 seconds => GPS Signal + 20 status (digitals)


## Operations

Client => (Calls to Radio Taxi)  => 555-28172 (Rivadavia 5200)

[ $Near taxis ] => Filter: (Radio Max 800 mts, availables, work, last passager > 20 min) => [taxi1, taxi2, taxi3, taxiN]

taxi1 => Send Request: [ yes / no ] if 'yes' show address
if 'no' then next taxi... ;


## Technicals issues
- MongoDB
- Node.js
- Virloc 10
- Vircom
- GSM
- Index geo spatial.
- UDP
- Bits.


## Binary mode

```javascript
const package = {
  position: [-32.29817272, 30.2991717],
  digitalStatus: [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  signalStatus: 75,
  gpsStatus: 850,
  power: 100,
};


position: 8 bytes
digitalStatus:  20 x 1 = 20 bytes
signalStatus: 1 x 1 = 1 byte
gpsStatus: 1 x 1 = 1 byte
power: 1 x 1 = 1 byte
=== 31 bytes

90,999999|0 = 30 bits
180,999999|0 = 31 bits
digitalStatus: 20 bits
signalStatus: 7 bits
gpsStatus: 16 bites
power: 7 bits
= 111 Bits = 14 bytes
const str = [
  '00000000',
  '00011101',
  '11001001',
  '00000111',
  '10111001',
  '10100110',
  '10101101',
  '11011100',
  '11101111',
  '10101010',
  '10101011',
  '01100101',
  '01010101',
  '01010101',
  '01010101',
].map(i => String.fromCharCode(parseInt(i, 2))).join('')

for (let x =0 ; x< str.length; x++) console.info(str[x].charCodeAt().toString(2))

// 20 seconds => 1 package (3 minute) x 60 (180 hour) x 24 (4320 day) x (129600 month)
// 1000 taxis = 129600000 (month)
```
