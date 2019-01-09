# Data Low Cost

Mobile App => [Items] - HTTP => Restful API => DB

//MAX: 100

{
  clientId: 100,
  vendorId: 5,
  Date: 20190108,
  Item:
  [
    {

      productId: 1947,
      Cant: 20,
    },
  ],
} // 83 bytes = 664 bits

Headers: 400 bytes = 3200 bits


AVG: 3800 bits.

1000 markets: 3.800.000 bits.


## Bits.

clientId: 465718 // 24 bits
vendorId: 501 // 20 bits
Date: 190108 // 20 bits
[
  productId: 58928, // 20 bits
  Cant: 8 // 17 bits
]


### Original bits set
```javascript
[
'00000000',
'00000000',
'00000000',

'00000000',
'00000000',
'0000 0000',
'00000000',
'00000000',
'11111111',

'00000000',
'00000000',
'0000 0000',
'00000000',
'00000 000',

'00000000',
'00000000',
'0000 0000',
'00000000',
'00000 000',

'00000000',
'00000000',
'0000 0000',
'00000000',
'00000 000',

'00000000',
'00000000',
'0000 0000',
'00000000',
'00000 000',


'11111111',


]
```

### Example bits set
```javascript
[
'01110001',
'10110011',
'01100000',
'00000001',
'11110101',
'00101110',
'01101001',
'11000000',
'11100110',
'00110000',
'00000000',
'00000100',
'00000000'
]
.map( n => parseInt(n, 2))
.map( c => c.toString(16))
//.map( c => String.fromCharCode(c))
.join('')

```
// String.fromCharCode



# tools

(https://www.hw-group.com/product-version/hercules)
