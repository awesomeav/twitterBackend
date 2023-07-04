import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"

@Injectable()
export class AppConfigService {
	private readonly _mongoDbUri!: string

	get mongoDbUri(): string {
		return this._mongoDbUri
	}

	constructor(private readonly _configService: ConfigService) {
		this._mongoDbUri = this._getMongoDbUriFromEnvFile()
	}

	private _getMongoDbUriFromEnvFile(): string {
		const mongoDbUri = this._configService.get<string>("MONGODB_DB_URI")
		console.log(mongoDbUri)

		if (!mongoDbUri) {
			throw new Error(
				"No connection string has been provided in the .env file."
			)
		}

		return mongoDbUri
	}
}
