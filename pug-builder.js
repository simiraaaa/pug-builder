const fs = require('fs');
const path = require('path');
const pug = require('pug');
const chokidar = require('chokidar');
const colors = require('colors/safe');
const moment = require('moment');

class PugBuilder {
  constructor(config) {
    this.setConfig(config);
    this.IS_INCLUDES = Symbol();
  }

  setConfig(config) {
    if (typeof config === 'string') {
      config = {
        target: config,
      };
    }
    this.config = {};
    config = config || {};
    this.config.const = config.const || {};
    this.config.target = config.target || '.';
    this.config.includes = config.includes;
    this.config.output = config.output || this.config.target;
    if (config.pretty) {
      this.config.const.pretty = config.pretty === true ? '  ' : config.pretty;
    }
    return this;
  }

  log(message) {
    console.log(`[${colors.gray(moment().format('hh:mm:ss'))}] ${message}`);
    return this;
  }

  error(message) {
    console.error(`[${colors.gray(moment().format('hh:mm:ss'))}] ${colors.red(message)}`);
    return this;
  }

  // removeAll() {
  //   this.files = {};
  //   return this;
  // }

  compile(file) {
    if (file === this.IS_INCLUDES) {
      this.build();
      return;
    }
    try {
      if (!path.isAbsolute(file)) {
        file = path.join(process.cwd(), file);
      }
      const html = pug.renderFile(file, this.config.const);
      this.output(file, html);
    }
    catch (e) {
      this.error(`${colors.red('compile failed:')} ${colors.cyan(file)}\n${colors.red(e.toString())}`);
    }
  }

  // remove(file) {
  //   delete this.files[file];
  // }

  build() {
    this.log(`Starting ${colors.cyan('Build')}`);
    // this.removeAll();
    const watcher = this.createWatcher()
      .on('add', this.compile.bind(this))
      .once('ready', () => {
        watcher.close();
      });
    return this;
  }

  output(file, html) {
    if (!path.isAbsolute(file)) {
      file = path.join(process.cwd(), file);
    }
    const fileName = file.replace(/\.[^.]*$/, '.html');
    fs.writeFileSync(fileName, html);
    this.log(`output ${colors.green(fileName)}`);
  }

  createWatcher() {
    return chokidar.watch(path.join(this.config.target, '**', '*.pug'), {
      ignored: /[\/\\]\./,
      persistent: true,
    });
  }

  watch() {
    // this.removeAll();

    if (this.watcher) {
      this.close();
    }

    const watcher = this.watcher = this.createWatcher();

    watcher
      .on('add', this.compile.bind(this))
      .on('change', this.compile.bind(this))
      // .on('unlink', this.remove.bind(this))
      .once('ready', () => {
        this.log(colors.cyan('監視開始'));
        // watcher.on('all', this.output.bind(this));
      });

    // includes の指定があれば、includes を監視して、変更があれば target を compile
    if (this.config.includes) {
      this._includesWatcher = chokidar.watch(path.join(this.config.includes, '**', '*.pug'), {
        ignored: /[\/\\]\./,
        persistent: true,
      }).on('change', () => {
        this.compile(this.IS_INCLUDES);
      });
    }

    return this;
  }

  close() {
    this.watcher && this.watcher.close();
    this.watcher = null;
    return this;
  }
}

const builder = module.exports = {
  create(config) {
    return new PugBuilder(config);
  },

  watch(config) {
    return builder.create(config).watch();
  },

  build(config) {
    return builder.create(config).build();
  }
};

