﻿function removeTimeZone(inDate){	return inDate.addMinutes(inDate.getTimezoneOffset());}