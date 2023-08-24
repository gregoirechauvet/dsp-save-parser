const STORAGE = [
	["version", r => r.readConstant(2)],
	["id", r => r.readInt32()],
	["entityId", r => r.readInt32()],
	["previous", r => r.readInt32()],
	["next", r => r.readInt32()],
	["bottom", r => r.readInt32()],
	["top", r => r.readInt32()],
	["type", r => r.readInt32()],
	["stuff", r => r.do(r => r.readInt32(), size => {
		const bans = r.readInt32();
		const grids = [];
		for (let i = 0; i < size; i++) {
			grids.push(r.readObject([
				["itemId", r => r.readInt32()],
				["filter", r => r.readInt32()],
				["count", r => r.readInt32()],
				["stackSize", r => r.readInt32()],
				["inc", r => r.readInt32()],
			]));
		}

		return {
			size,
			bans,
			grids,
		}
	})],
];

/** @type {[string, (r: Reader) => any][]} */
export const FILE_FORMAT = [
	["vfSave", r => r.readChars(6)],
	["zero", r => r.readInt64()],
	["saveFileFormatNumber", r => r.readInt32()],
	["isSandboxMode", r => r.readBoolean()],
	["isPeaceMode", r => r.readBoolean()],
	["majorGameVersion", r => r.readInt32()],
	["minorGameVersion", r => r.readInt32()],
	["releaseGameVersion", r => r.readInt32()],
	["releaseBuildVersion", r => r.readInt32()],
	["gameTick", r => r.readInt64()],
	["nowTick", r => r.readInt64()],
	["image", r => r.readImage()],
	["zeroAgain", r => r.readInt32()],
	["account", r => r.readObject([
		["platform", r => r.readInt32()],
		["userId", r => r.readUint64()],
		["userName", r => r.readString()]
	])],
	["energyGenCurrentTick", r => r.readUint64()],
	["data", r => r.readObject([
		["version", r => r.readInt32()],
		["patch", r => r.readInt32()],
		["account", r => r.readObject([
			["zero", r => r.readInt32()],
			["platform", r => r.readInt32()],
			["userId", r => r.readUint64()],
			["userName", r => r.readString()]
		])],
		["gameName", r => r.readString()],
		["gameDesc", r => r.readObject([
			["version", r => r.readInt32()],
			["creationTimeTicks", r => r.readInt64()],
			["creationVersionMajor", r => r.readInt32()],
			["creationVersionMinor", r => r.readInt32()],
			["creationVersionRelease", r => r.readInt32()],
			["creationVersionBuild", r => r.readInt32()],
			["galaxyAlgo", r => r.readInt32()],
			["galaxySeed", r => r.readInt32()],
			["starCount", r => r.readInt32()],
			["playerProto", r => r.readInt32()],
			["resourceMultiplier", r => r.readFloat32()],
			["savedThemeIds", r => r.readArray(r => r.readInt32())],
			["achievementEnable", r => r.readBoolean()],
			["isPeaceMode", r => r.readBoolean()],
			["isSandboxMode", r => r.readBoolean()],
		])],
		["gameTick", r => r.readInt64()],
		["gameAchievement", r => r.readObject([
			["version", r => r.readInt32()],
			["runtimeDatas", r => r.readArray(r => r.readObject([
				["key", r => r.readInt32()],
				["value", r => r.readObject([
					["id", r => r.readInt16()],
					["version", r => r.readInt16()],
					["progress", r => r.readInt64()],
					["capacity", r => r.readInt32()],
					["factories", r => r.do(r => r.readInt32(), size => {
						const heavyHydSamp = [];
						for (let i = 0; i < size * 600; i++) {
							heavyHydSamp.push(r.readInt64());
						}
						const productFix = [];
						for (let i = 0; i < size; i++) {
							productFix.push(r.readInt64());
						}

						return { heavyHydSamp, productFix };
					})],
				])],
			]))],
		])],
		["preferences", r => r.readObject([
			["version", r => r.readInt32()],
			["cameraUPos.x", r => r.readFloat64()],
			["cameraUPos.y", r => r.readFloat64()],
			["cameraUPos.z", r => r.readFloat64()],
			["cameraURot.x", r => r.readFloat32()],
			["cameraURot.y", r => r.readFloat32()],
			["cameraURot.z", r => r.readFloat32()],
			["cameraURot.w", r => r.readFloat32()],
			["reformBrushSize", r => r.readInt32()],
			["reformBrushType", r => r.readInt32()],
			["reformBrushDecalType", r => r.readInt32()],
			["reformBrushColor", r => r.readInt32()],
			["replicatorMultipliers", r => r.readArray(r => r.readObject([
				["key", r => r.readInt32()],
				["value", r => r.readInt32()],
			]))],
			["detailPower", r => r.readBoolean()],
			["detailVein", r => r.readBoolean()],
			["detailSpaceGuide", r => r.readBoolean()],
			["detailSign", r => r.readBoolean()],
			["detailIcon", r => r.readBoolean()],
			["tutorialShowing", r => r.readArray(r => r.readInt32())],
			["astroNames", r => r.readArray(r => r.readObject([
				["key", r => r.readInt32()],
				["value", r => r.readString()],
			]))],
			["upgradeLevel", r => r.readInt32()],
			["upgradeCursorType", r => r.readInt16()],
			["upgradeCursorSize", r => r.readInt16()],
			["upgradeFilterFacility", r => r.readBoolean()],
			["upgradeFilterBelt", r => r.readBoolean()],
			["upgradeFilterInserter", r => r.readBoolean()],
			["dismantleCursorType", r => r.readInt16()],
			["dismantleCursorSize", r => r.readInt16()],
			["dismantleFilterFacility", r => r.readBoolean()],
			["dismantleFilterBelt", r => r.readBoolean()],
			["dismantleFilterInserter", r => r.readBoolean()],
			["dysonSphereHideFarSideInEditor", r => r.readBoolean()],
			["dysonSphereHideRocketBodies", r => r.readBoolean()],
			["techTreeShowProperty", r => r.readBoolean()],
		])],
		["history", r => r.readObject([
			["version", r => r.readInt32()],
			["recipesUnlocked", r => r.readArray(r => r.readInt32())],
			["tutorialsUnlocked", r => r.readArray(r => r.readInt32())],
			["featureKeys", r => r.readArray(r => r.readInt32())],
			["featureValues", r => r.readArray(r => r.readObject([
				["key", r => r.readInt32()],
				["value", r => r.readInt32()],
			]))],
			["journalSystem", r => r.readObject([
				["version", r => r.readInt32()],
				["journals", r => r.readArray(r => r.readObject([
					["version", r => r.readInt32()],
					["patternId", r => r.readInt32()],
					["parameters", r => r.readArray(r => r.readInt64())],
				]))],
			])],
			["techStates", r => r.readArray(r => r.readObject([
				["key", r => r.readInt32()],
				["unlocked", r => r.readBoolean()],
				["curLevel", r => r.readInt32()],
				["maxLevel", r => r.readInt32()],
				["hashUploaded", r => r.readInt64()],
				["hashNeeded", r => r.readInt64()],
			]))],
			["automanageLabItems", r => r.readBoolean()],
			["currentTech", r => r.readInt32()],
			["techQueue", r => r.readArray(r => r.readInt32())],
			["universeObserverLevel", r => r.readInt32()],
			["blueprintLimit", r => r.readInt32()],
			["solarSailLife", r => r.readFloat32()],
			["solarEnergyLossRate", r => r.readFloat32()],
			["useIonLayer", r => r.readBoolean()],
			["inserterStackCount", r => r.readInt32()],
			["logisticDroneSpeed", r => r.readFloat32()],
			["logisticDroneSpeedScale", r => r.readFloat32()],
			["logisticDroneCarries", r => r.readInt32()],
			["logisticShipSailSpeed", r => r.readFloat32()],
			["logisticShipWarpSpeed", r => r.readFloat32()],
			["logisticShipSpeedScale", r => r.readFloat32()],
			["logisticShipWarpDrive", r => r.readBoolean()],
			["logisticShipCarries", r => r.readInt32()],
			["logisticCourierSpeed", r => r.readFloat32()],
			["logisticCourierSpeedScale", r => r.readFloat32()],
			["logisticCourierCarries", r => r.readInt32()],
			["dispenserDeliveryMaxAngle", r => r.readFloat32()],
			["miningCostRate", r => r.readFloat32()],
			["miningSpeedScale", r => r.readFloat32()],
			["storageLevel", r => r.readInt32()],
			["labLevel", r => r.readInt32()],
			["techSpeed", r => r.readInt32()],
			["dysonNodeLatitude", r => r.readFloat32()],
			["universeMatrixPointUploaded", r => r.readInt64()],
			["missionAccomplished", r => r.readBoolean()],
			["stationPilerLevel", r => r.readInt32()],
			["remoteStationExtraStorage", r => r.readInt32()],
			["localStationExtraStorage", r => r.readInt32()],
			["productionData", r => r.readArray(r => r.readObject([
				["id", r => r.readInt32()],
				["count", r => r.readInt32()],
			]))],
			["consumptionData", r => r.readArray(r => r.readObject([
				["id", r => r.readInt32()],
				["count", r => r.readInt32()],
			]))],
			["createWithSandboxMode", r => r.readBoolean()],
		])],
		["hidePlayerModel", r => r.readBoolean()],
		["disableController", r => r.readBoolean()],
		["statistics", r => r.readObject([
			["version", r => r.readConstant(0)],
			["techHashedHistory", r => r.readArray(r => r.readInt32())],
			["production", r => r.readObject([
				["version", r => r.readConstant(0)],
				["factoryStatPools", r => r.readArray(r => r.readObject([
					["version", r => r.readConstant(1)],
					["productCapacity", r => r.readInt32()],
					["productPool", r => r.do(r => r.readInt32(), value => {
						const output = [];
						for (let i = 1; i < value; i++) {
							output.push(r.readObject([
								["version", r => r.readConstant(1)],
								["count", r => r.readArray(r => r.readInt32())],
								["cursor", r => r.readArray(r => r.readInt32())],
								["total", r => r.readArray(r => r.readInt64())],
								["itemId", r => r.readInt32()],
							]))
						}
						return output;
					})],
					["powerPool", r => r.readArray(r => r.readObject([
						["version", r => r.readConstant(0)],
						["energy", r => r.readArray(r => r.readInt64())],
						["cursor", r => r.readArray(r => r.readInt32())],
						["total", r => r.readArray(r => r.readInt64())],
					]))],
					["productIndices", r => r.readArray(r => r.readInt32())],
					["energyConsumption", r => r.readInt64()],
				]))],
				["firstCreateIds", r => r.readArray(r => r.readInt32())],
				["favoriteIds", r => r.readArray(r => r.readInt32())],
			])],
		])],
		["localPlanet", r => r.readInt32()],
		["mainPlayer", r => r.readObject([
			["version", r => r.readConstant(3)],
			["planetId", r => r.readInt32()],
			["position.x", r => r.readFloat32()],
			["position.y", r => r.readFloat32()],
			["position.z", r => r.readFloat32()],
			["uPosition.x", r => r.readFloat64()],
			["uPosition.y", r => r.readFloat64()],
			["uPosition.z", r => r.readFloat64()],
			["uRotation.x", r => r.readFloat32()],
			["uRotation.y", r => r.readFloat32()],
			["uRotation.z", r => r.readFloat32()],
			["uRotation.w", r => r.readFloat32()],
			["movementState", r => r.readInt32()],
			["warpState", r => r.readFloat32()],
			["warpCommand", r => r.readBoolean()],
			["uVelocity.x", r => r.readFloat64()],
			["uVelocity.y", r => r.readFloat64()],
			["uVelocity.z", r => r.readFloat64()],
			["inhandItemId", r => r.readInt32()],
			["inhandItemCount", r => r.readInt32()],
			["inhandItemInc", r => r.readInt32()],
			["mecha", r => r.readObject([
				["version", r => r.readConstant(6)],
				["coreEnergyCap", r => r.readFloat64()],
				["coreEnergy", r => r.readFloat64()],
				["corePowerGen", r => r.readFloat64()],
				["reactorPowerGen", r => r.readFloat64()],
				["reactorEnergy", r => r.readFloat64()],
				["reactorItemId", r => r.readInt32()],
				["reactorItemInc", r => r.readInt32()],
				["reactorStorage", r => r.readObject(STORAGE)],
				["warpStorage", r => r.readObject(STORAGE)],
				["walkPower", r => r.readFloat64()],
				["jumpEnergy", r => r.readFloat64()],
				["thrustPowerPerAcc", r => r.readFloat64()],
				["warpKeepingPowerPerSpeed", r => r.readFloat64()],
				["warpStartPowerPerSpeed", r => r.readFloat64()],
				["miningPower", r => r.readFloat64()],
				["replicatePower", r => r.readFloat64()],
				["researchPower", r => r.readFloat64()],
				["droneEjectEnergy", r => r.readFloat64()],
				["droneEnergyPerMeter", r => r.readFloat64()],
				["coreLevel", r => r.readInt32()],
				["thrusterLevel", r => r.readInt32()],
				["miningSpeed", r => r.readFloat32()],
				["replicateSpeed", r => r.readFloat32()],
				["walkSpeed", r => r.readFloat32()],
				["jumpSpeed", r => r.readFloat32()],
				["maxSailSpeed", r => r.readFloat32()],
				["maxWarpSpeed", r => r.readFloat32()],
				["buildArea", r => r.readFloat32()],
				["forge", r => r.readObject([
					["version", r => r.readConstant(0)],
					["tasks", r => r.readArray(r => r.readObject([
						["version", r => r.readConstant(0)],
						["recipeId", r => r.readInt32()],
						["count", r => r.readInt32()],
						["tick", r => r.readInt32()],
						["tickSpend", r => r.readInt32()],
						["stuff", r => r.do(() => {}, () => {
							const itemIdLength = r.readInt32();
							const productLength = r.readInt32();

							const items = [];
							for (let i = 0; i < itemIdLength; i++) {
								const value = r.readObject([
									["id", r => r.readInt32()],
									["itemCount", r => r.readInt32()],
									["served", r => r.readInt32()],
								]);
								items.push(value);
							}
							
							const products = [];
							for (let i = 0; i < productLength; i++) {
								const value = r.readObject([
									["id", r => r.readInt32()],
									["itemCount", r => r.readInt32()],
									["produced", r => r.readInt32()],
								]);
								items.push(value);
							}

							return { items, products }
						})],
						["parentTaskIndex", r => r.readInt32()],
					]))],
				])],
				["lab", r => r.readObject([
					["version", r => r.readConstant(0)],
					["items", r => r.readArray(r => r.readObject([
						["key", r => r.readInt32()],
						["value", r => r.readInt32()],
					]))],
				])],
				["droneInfo", r => r.do(r => r.readInt32(), droneCount => {
					const droneSpeed = r.readFloat32();
					const droneMovement = r.readInt32();

					const drones = [];
					for (let i = 0; i < droneCount; i++) {
						const value = r.readObject([
							["version", r => r.readConstant(0)],
							["stage", r => r.readInt32()],
							["positionX", r => r.readFloat32()],
							["positionY", r => r.readFloat32()],
							["positionZ", r => r.readFloat32()],
							["targetX", r => r.readFloat32()],
							["targetY", r => r.readFloat32()],
							["targetZ", r => r.readFloat32()],
							["forwardX", r => r.readFloat32()],
							["forwardY", r => r.readFloat32()],
							["forwardZ", r => r.readFloat32()],
							["speed", r => r.readFloat32()],
							["movement", r => r.readInt32()],
							["targetObject", r => r.readInt32()],
							["progress", r => r.readFloat32()],
							["initialVectorX", r => r.readFloat32()],
							["initialVectorY", r => r.readFloat32()],
							["initialVectorZ", r => r.readFloat32()],
						]);
						drones.push(value);
					}
					return {
						drones,
						droneSpeed,
						droneMovement,
					}
				})],
				["appearance", r => r.readObject([
					["version", r => r.readConstant(1)],
					["overrideName", r => r.readString()],
					["description", r => r.readString()],
					["thumbnail", r => r.readImage()],
					["colors", r => r.do(r => r.readInt32(), colorCount => {
						// ["mainColors", r => r.readArray(r => r.readObject([
						// 	// @TODO doesn't look right
						// 	["r", r => r.readInt8()],
						// 	["g", r => r.readInt8()],
						// 	["b", r => r.readInt8()],
						// 	["a", r => r.readInt8()],
						// ]))],
						// ["partColors", r => r.readArray(r => r.readObject([
						// 	// @TODO doesn't look right
						// 	["r", r => r.readInt8()],
						// 	["g", r => r.readInt8()],
						// 	["b", r => r.readInt8()],
						// 	["a", r => r.readInt8()],
						// ]))],
					})],
				])],
			])],
			// ["package", r => r.readObject([
			// ])],
			// ["deliveryPackage", r => r.readObject([
			// ])],
			// ["navigation", r => r.readObject([
			// ])],
			// ["sandCount", r => r.readInt32()],
		])],
	])]
]
