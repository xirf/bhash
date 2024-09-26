class Arcode{
	constructor(_string){
		this._string = _string;
		this.freq = this.getFreq();
		this.prob = this.calcProbs();
		this.interval = this.getInterval()
	}

	getFreq(){
		let freq = {}
		for (let sym of this._string){
			freq[sym] = (freq[sym] || 0) + 1;
		}
		console.log(freq)
		return freq;
	}

	calcProbs(){
		let numSym = this._string.length;
		let probs  = {} 
		for (let sym in this.freq){
			probs[sym] = this.freq[sym] / numSym
		}
		console.log(probs)
		return probs;
	}

	getInterval(){
		let low = 0;
		let interval = {};
		for (let sym in this.prob){
			const _prob = this.prob[sym]
			const high = low + _prob
			interval[sym] = { low, high}
			low = high
		}
		console.log(interval)
		return interval;
	}
	encode(){
		let low = 0.0;
		let high = 1.0;

		for(let sym of this._string){
			let i = this.interval[sym]
			const range = high - low
			high = low + range * i.high
			low = low + range * i.low
		}

		const fin = (low + high) / 2
		return { fin, low, high }
	}
}

const input = "hello world"
const ac = new Arcode(input)
const encoded = ac.encode()

console.log(encoded)
