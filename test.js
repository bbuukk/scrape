seeds, legumeSeeds;
// seeds,legumeSeeds

// const path = "seeds";
// const regex = new RegExp(`^${path},[^,]+$`);
// console.log(path.match(regex));

const path = "seeds";
const regex = new RegExp(`^${path},[^,]+$`);
console.log("seeds,legumeSeeds".match(regex)); // This will return ["seeds,legumeSeeds"]
