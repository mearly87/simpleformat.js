var simpleformat = (function() {
    
	var isCharacterKeyPress = function(evt) {
        if (typeof evt.which == "undefined") {
            // This is IE, which only fires keypress events for printable keys
            return true;
        } else if (typeof evt.which == "number" && evt.which > 0) {
            // In other browsers except old versions of WebKit, evt.which is
            // only greater than zero if the keypress is a printable key.
            // We need to filter out backspace and ctrl/alt/meta key combinations
            return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
        }
        return false;
	},

	getNewCursorPosition = function(cursor, startVal, endVal, formatLength, mask) {
		newChar = startVal.charAt(cursor - 1),
		nextCharInfo = startVal.substring(cursor, formatLength).match(mask),
		nextChar = (nextCharInfo ||[])[0],
		nextCharPos = (nextCharInfo ||{}).index + cursor;
		if(!newChar.match(mask)) {
			return cursor - 1;
		}
		if(nextChar) {
			return endVal.substring(nextCharPos).indexOf(nextChar) + nextCharPos;
		}
		return -1;
	},

	format = function(value, format, mask, escapeCharacter)
	{
		var oldVal = value,
		newVal = '';
		for(var i = 0; i < format.length; i++) {
			var nextChar = oldVal.substring(0,1),
			nextFormat = format[i];
			if (nextFormat != nextChar && nextFormat == escapeCharacter) {
                if (mask.test(nextChar)) {
                    newVal += nextChar;
                } else {
                    i--;   
                }
				oldVal = oldVal.substring(1);
				if (oldVal.length === 0) {
					break;
                }
			} else if (nextChar == nextFormat) {
                newVal += nextFormat;
                oldVal = oldVal.substring(1);
            } else if (nextFormat != escapeCharacter) {
				newVal += nextFormat;
            }
		}
		return newVal;
	},

	formatInput = function(obj, event, format, mask, escapeCharacter) {
		escapeCharacter = escapeCharacter || 'X';
        mask = mask || /\d/;
		if(isCharacterKeyPress(event)) {
			var newVal = this.format(obj.value, format, mask, escapeCharacter);
            if (newVal != obj.value) {
                cursor = getNewCursorPosition(obj.selectionStart, obj.value, newVal, format.length, mask);
                obj.value = newVal;
                if (cursor != -1) {
                    if(obj.setSelectionRange) {
                        obj.setSelectionRange(cursor, cursor, 0);
                    }
                }			
            }
		}
	};
    return {format : format, formatInput: formatInput};
})();

simpleformat.formatPhone = function(obj, event)
{
		phoneFormat = '(XXX) XXX-XXXX';
		simpleformat.formatInput(obj, event, phoneFormat);
};

simpleformat.formatTaxId = function(obj, event)
{
		var taxIdFormat = 'XX-XXXXXXX';
		simpleformat.formatInput(obj, event, taxIdFormat);
};

simpleformat.formatSSN = function(obj, event)
{
		var taxIdFormat = 'XXX-XX-XXXX';
		simpleformat.formatInput(obj, event, taxIdFormat);
};