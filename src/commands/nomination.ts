import {Command, flags} from '@oclif/command'
import * as csv from 'csvtojson'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'

async function convertNomination(filePath: string): Promise<void> {
  // load CSV
  // const file = await readFileSync(filePath)

  // Generate Twitter copy paste
  csv({
    headers: ['Timestamp', 'Name', 'Twitter', 'LinkedIn', 'NominationText', 'YourName', 'YourTwitter', 'YourLinkedIn'],
  })
  .fromFile(filePath)
  .then(
    // eslint-disable-next-line no-console
    nominations => nominations.forEach(nomination => {
      const source = fs.readFileSync('./templates/tester-nomination.twitter.txt.hbr')
      const template = Handlebars.compile(String(source))
      const Quote = String(nomination.NominationText).slice(0, 180)
      const outputFile = template({
        Quote,
        Twitter: nomination.Twitter,
        YourTwitter: nomination.YourTwitter,
      })
      const unformattedFilename = `${nomination.Name}.twitter.txt`
      const filename = unformattedFilename.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line no-console
      fs.writeFileSync(`./output/${filename}`, outputFile)
    })
  )

  // Generate LinkedIn Copy Paste

  csv({
    headers: ['Timestamp', 'Name', 'Twitter', 'LinkedIn', 'NominationText', 'YourName', 'YourTwitter', 'YourLinkedIn'],
  })
  .fromFile(filePath)
  .then(
    // eslint-disable-next-line no-console
    nominations => nominations.forEach(nomination => {
      const source = fs.readFileSync('./templates/tester-nomination.linkedin.txt.hbr')
      const template = Handlebars.compile(String(source))
      const outputFile = template({
        NominationText: nomination.NominationText,
        Name: nomination.Name,
        YourName: nomination.YourName,
      })
      const unformattedFilename = `${nomination.Name}.linkedin.txt`
      const filename = unformattedFilename.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line no-console
      fs.writeFileSync(`./output/${filename}`, outputFile)
    })
  )

  // Generate JSON copy paste

  csv({
    headers: ['Timestamp', 'Name', 'Twitter', 'LinkedIn', 'NominationText', 'YourName', 'YourTwitter', 'YourLinkedIn'],
  })
  .fromFile(filePath)
  .then(
    // eslint-disable-next-line no-console
    nominations => nominations.forEach(nomination => {
      const source = fs.readFileSync('./templates/tester-nomination.json.hbr')
      const template = Handlebars.compile(String(source))
      const outputFile = template({
        Name: nomination.Name,
        NominationText: nomination.NominationText,
        Twitter: nomination.Twitter,
        LinkedIn: nomination.LinkedIn,
        YourName: nomination.YourName,
      })
      const unformattedFilename = `${nomination.Name}.json`
      const filename = unformattedFilename.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line no-console
      fs.writeFileSync(`./output/${filename}`, outputFile)
    })
  )
}

export default class Nomination extends Command {
  static description = 'Convert CSV from of Interviews to Markdown'

  static examples = [
    `$ totd nomination ./input/input.csv
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args} = this.parse(Nomination)

    if (args.file) {
      this.log(`--file: ${args.file}`)
      await convertNomination(`${args.file}`)
    } else {
      this.log('No file provided.')
    }
  }
}

