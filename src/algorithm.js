const AdventureId = (level, adventures) => {
	let rank = "";
	if (level < 10) rank = "f";
	else if (level < 20) rank = "e";
	else if (level < 30) rank = "d";
	else if (level < 40) rank = "c";
	else if (level < 60) rank = "b";
	else if (level < 90) rank = "a";
	else if (level < 200) rank = "s";

	//* generating unicode
	const length = adventures.filter((adventure) => {
		return adventure.id.includes(rank);
	}).length;
	let code = "";
	if (length === 0) code += "000";
	else if (length.toString().length == 1) code += "000";
	else if (length.toString().length == 2) code += "00";
	else if (length.toString().length == 3) code += "0";
	code += (length + 1).toString();

	//* adding date
	const dt = new Date();
	const day =
		dt.getDate().toString().length == 1
			? "0" + dt.getDate().toString()
			: dt.getDate().toString();
	const month =
		dt.getMonth().toString().length == 1
			? "0" + dt.getMonth().toString()
			: dt.getMonth().toString();
	return "q" + rank + code + day + month;
};

module.exports = AdventureId;
