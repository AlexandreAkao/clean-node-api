import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string | undefined): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null as unknown as AccountModel
  }
}
