const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
	


	var total = 0;
	blogs.forEach(i => total = total + i.likes);
	console.log("MESSAGE INSIDE TEST FUNCTION");
	//const newTotal = total;
	return total
	/*
	for (i in blogs) {
		const likes = i.likes
		total = total + likes
	}
	return total
	*/
}


module.exports = {
  dummy,
  totalLikes
}