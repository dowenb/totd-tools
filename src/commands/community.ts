import {Command, flags} from '@oclif/command'
import * as csv from 'csvtojson'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as moment from 'moment'

async function convertCommunities(filePath: string): Promise<void> {
  // load CSV
  // const file = await readFileSync(filePath)
  const today = moment()
  csv({
    headers: ['Timestamp', 'Name', 'Twitter', 'LinkedIn', 'Journey', 'BestBug', 'Quality', 'Tool', 'Joke', 'Advice', 'Promote', 'Grow', 'Differently'],
  })
  .fromFile(filePath)
  .then(
    // eslint-disable-next-line no-console
    communities => communities.forEach(community => {
      const source = fs.readFileSync('./templates/tester-community.markdown.hbr')
      const template = Handlebars.compile(String(source))
      const outputFile = template({
        name: community.Name,
        dateTime: today.format('YYYY-MM-DD HH:mm:ss'),
        twitter: community.Twitter,
        linkedin: community.LinkedIn,
        journey: community.Journey,
        bestBug: community.BestBug,
        quality: community.Quality,
        tool: community.Tool,
        joke: community.Joke,
        advice: community.Advice,
        promote: community.Promote,
      })
      const unformattedFilename = `${today.format('YYYY-MM-DD')}-${community.Name}.markdown`
      const filename = unformattedFilename.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line no-console
      fs.writeFileSync(`./output/${filename}`, outputFile)
    })
  )
}

export default class Communities extends Command {
  static description = 'Convert CSV from of Communities to Markdown'

  static examples = [
    `$ totd community ./input/input.csv
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
    const {args} = this.parse(Communities)

    if (args.file) {
      this.log(`--file: ${args.file}`)
      await convertCommunities(`${args.file}`)
    } else {
      this.log('No file provided.')
    }
  }
}

