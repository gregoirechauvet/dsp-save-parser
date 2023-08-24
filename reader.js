export class Reader {
	#decoder = new TextDecoder("utf-8")
	/** @type {ArrayBuffer} */
	#buffer;
	#cursor = 0;

	/**
	 * @param {ArrayBuffer} buffer
	 */
	constructor(buffer) {
		this.#buffer = buffer;
	}

	/**
	 * @param {number} size 
	 */
	readBuffer(size) {
		const output = this.#buffer.slice(this.#cursor, this.#cursor + size);
		this.#cursor += size;
		return output;
	}

	/**
	 * @param {number} size 
	 */
	readChars(size) {
		const buffer = this.readBuffer(size);
		return this.#decoder.decode(buffer);
	}

	readInt16() {
		const buffer = this.readBuffer(2);
		const dataView = new DataView(buffer);
		return dataView.getInt16(0, true);				
	}

	readInt64() {
		const buffer = this.readBuffer(8);
		const dataView = new DataView(buffer);
		return dataView.getBigInt64(0, true);
	}

	readFloat32() {
		const buffer = this.readBuffer(4);
		const dataView = new DataView(buffer);
		return dataView.getFloat32(0, true);
	}

	readFloat64() {
		const buffer = this.readBuffer(8);
		const dataView = new DataView(buffer);
		return dataView.getFloat64(0, true);
	}

	readUint64() {
		const buffer = this.readBuffer(8);
		const dataView = new DataView(buffer);
		return dataView.getBigUint64(0, true);
	}

	readInt8() {
		const buffer = this.readBuffer(1);
		const dataView = new DataView(buffer);
		return dataView.getInt8(0, true);
	}

	readInt32() {
		const buffer = this.readBuffer(4);
		const dataView = new DataView(buffer);
		return dataView.getInt32(0, true);
	}

	/**
	 * @template T
	 * @param {(r: Reader) => T} callback 
	 */
	readArray(callback) {
		const size = this.readInt32();

		const output = [];
		for (let i = 0; i < size; i++) {
			output.push(callback(this));
		}
		return output;
	}

	/**
	 * @template T
	 * @param {(r: Reader) => T} extractor
	 * @param {T} expected
	 */
	assert(extractor, expected) {
		const value = extractor(this);
		if (value !== expected) {
			throw new Error(`${value} is not equal to expected: ${expected}`);
		}
		return value;
	}

	/**
	 * @template T
	 * @template K
	 * @param {(r: Reader) => T} extractor
	 * @param {(value: T) => K} callback
	 */
	do(extractor, callback) {
		const value = extractor(this);
		return callback(value);
	}

	readImage() {
		const sizeOfPngFile = this.readInt32();
		if (sizeOfPngFile === 0) {
			return null;
		}

		const buffer = this.readBuffer(sizeOfPngFile);

		const blob = new Blob([buffer]);

	    const url = URL.createObjectURL(blob);
	    const img = document.createElement('img');
	    img.src = url;
	    document.querySelector('body').appendChild(img);
	    img.onload = e => URL.revokeObjectURL(url);

		return img;
	}

	/**
	 * @param {number} expected 
	 */
	readConstant(expected) {
		return this.assert(r => r.readInt32(), expected);
	}

	readBoolean() {
		const value = this.readInt8();
		return value === 1;
	}

	/**
	 * @param {[string, (r: Reader) => any][]} config 
	 */
	readObject(config) {
		/** @type {[string, any][]} */
		const mapped = config.map(([key, method]) => {
			try {
				return [key, method(this)];
			} catch(e) {
				console.error(`Error reading key: ${key}`);
				throw e;
			}
		})
		return Object.fromEntries(mapped);
	}

	readString() {
		let bufferToRead = this.readInt8();

		// TODO: while loop
		const buffer = this.readBuffer(bufferToRead);
		const output = this.#decoder.decode(buffer);
		return output;
	}
}