import {Command, flags} from '@oclif/command'
import * as csv from 'csvtojson'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as moment from 'moment'

async function convertInterview(filePath: string): Promise<void> {
  // load CSV
  // const file = await readFileSync(filePath)
  const today = moment()
  csv({
    headers: ['Timestamp', 'Name', 'Twitter', 'LinkedIn', 'Journey', 'BestBug', 'Advice', 'Winning', 'Grow', 'Differently'],
  })
  .fromFile(filePath)
  .then(
    // eslint-disable-next-line no-console
    interviews => interviews.forEach(interview => {
      const source = fs.readFileSync('./templates/tester-interview.markdown.hbr')
      const template = Handlebars.compile(String(source))
      const outputFile = template({
        name: interview.Name,
        dateTime: today.format('YYYY-MM-DD HH:mm:ss'),
        twitter: interview.Twitter,
        linkedin: interview.LinkedIn,
        journey: interview.Journey,
        bestBug: interview.BestBug,
        advice: interview.Advice,
        winning: interview.Winning,
      })
      const unformattedFilename = `${today.format('YYYY-MM-DD')}-${interview.Name}.markdown`
      const filename = unformattedFilename.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line no-console
      fs.writeFileSync(`./output/${filename}`, outputFile)
    })
  )
}

export default class Interview extends Command {
  static description = 'Convert CSV from of Interviews to Markdown'

  static examples = [
    `$ totd interview ./input/input.csv
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
    const {args} = this.parse(Interview)

    if (args.file) {
      this.log(`--file: ${args.file}`)
      await convertInterview(`${args.file}`)
    } else {
      this.log('No file provided.')
    }
  }
}

