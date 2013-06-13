simpleformat.js
===============

simpleformat.js is a library that makes is extremely easy to format and mask fields like phone numbers and social security numbers. Out of the box it has three formats:

formatPhone: __(XXX) XXX-XXXX__

formatTaxId: __XX-XXXXXXX__

formatSSN: __XXX-XX-XXXX__

check it out: http://jsfiddle.net/yEdAX/4/

Here is an example that binds the format to a field:

```html
    <input id="business_tel" maxlength="14" name="business[tel]" onkeyup="simpleformat.formatPhone(this, event)" >
```
We fire off the format onkeyup so that every time a user types a character the field automatically formats.

It's easy to define your own formats too. Here is the code that defines a phone format without an area code:

```javascript
    simpleformat.formatPhone = function(obj, event)
   {
		phoneFormat = 'XXX-XXXX'
		simpleformat.formatInput(obj, event, phoneFormat);
    }
```
The escape character for numbers is by default 'X'. If you want to use an 'X'. If you want to use an 'X' as part of your format, you can specifiy a different scape character in 'formatInput'. Here is an exmaple that uses the 'X' in the format to specifiy a phone extension:
```javascript
    simpleformat.formatPhone = function(obj, event)
    {
		phoneFormat = '###-#### X###'
		simpleformat.formatInput(obj, event, phoneFormat, '#');
    }
```
