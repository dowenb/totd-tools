import {Command, flags} from '@oclif/command'
import * as csv from 'csvtojson'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'

async function convertFeedback(filePath: string): Promise<void> {
  // load CSV
  // const file = await readFileSync(filePath)
  csv({
    headers: ['Timestamp', 'Name', 'Twitter', 'LinkedIn', 'Journey', 'BestBug', 'Advice', 'Winning', 'Grow', 'Differently'],
  })
  .fromFile(filePath)
  .then(
    // eslint-disable-next-line no-console
    feedback => {
      const source = fs.readFileSync('./templates/feedback.html.hbr')
      const template = Handlebars.compile(String(source))
      const outputFile = template({feedback})
      const unformattedFilename = 'feedback.html'
      const filename = unformattedFilename.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line no-console
      fs.writeFileSync(`./output/${filename}`, outputFile)
    }
  )
}

export default class Feedback extends Command {
  static description = 'Convert CSV from of feedback to HTML'

  static examples = [
    `$ totd feedback ./input/input.csv
    --file: .\\input\\feedback.csv
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
    const {args} = this.parse(Feedback)

    if (args.file) {
      this.log(`--file: ${args.file}`)
      await convertFeedback(`${args.file}`)
    } else {
      this.log('No file provided.')
    }
  }
}

