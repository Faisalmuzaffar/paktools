<div align="center">
        <img src="src/assets/logo.png" width="300" />
        <br /><br />
<a href="https://trendshift.io/repositories/13055" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13055" alt="Faisalmuzaffar%2Fpaktools | Trendshift" style="width: 200px;" width="200"/></a>
   <br /><br />
<a href="https://github.com/Faisalmuzaffar/paktools/releases">
          <img src="https://img.shields.io/badge/version-0.4.0-blue?style=for-the-badge" />
        </a>
        <a href="https://hub.docker.com/r/faisalmuzaffar/pak-tools">
          <img src="https://img.shields.io/docker/pulls/faisalmuzaffar/pak-tools?style=for-the-badge&logo=docker" />
        </a>
        <a href="https://github.com/Faisalmuzaffar">
          <img src="https://img.shields.io/github/stars/Faisalmuzaffar/paktools?style=for-the-badge&logo=github" />
        </a>
        <a href="https://github.com/Faisalmuzaffar/paktools/blob/main/LICENSE">
          <img src="https://img.shields.io/github/license/Faisalmuzaffar/paktools?style=for-the-badge" />
        </a>
        <a href="https://discord.gg/SDbbn3hT4b">
          <img src="https://img.shields.io/discord/1342971141823664179?label=Discord&style=for-the-badge" />
        </a>
        <br /><br />
</div>

Welcome to PakTools, a self-hosted web app offering a variety of online tools to simplify everyday tasks.
Whether you are coding, manipulating images/videos, PDFs or crunching numbers, PakTools has you covered. Please don't
forget to
star the repo to support us.
Here is the [demo](https://paktools.app) website.

All files are processed entirely on the client side: nothing ever leaves your device.
Plus, the Docker image is super lightweight at just 28MB, making it fast to deploy and easy to self-host.

![img.png](img.png)

## Table of Contents

- [Features](#features)
- [Self-host](#self-hostrun)
- [Contribute](#contribute)
- [License](#license)
- [Contact](#contact)

## Features

We strive to offer a variety of tools, including:

## **Image/Video/Binary Tools**

- Image Resizer
- Image Converter
- Video Trimmer
- Video Reverser
- And more...

## **String/List Tools**

- Case Converters
- List Shuffler
- Text Formatters
- And more...

## **Date and Time Tools**

- Date Calculators
- Time Zone Converters
- And more...

## **Math Tools**

- Generate Prime Numbers
- Generate Perfect Numbers
- And more...

## **Miscellaneous Tools**

- JSON Tools
- PDF Tools
- CSV Tools
- And more...

Stay tuned as we continue to expand and improve our collection!

## Self-host/Run

### Docker

```bash
docker run -d --name pak-tools --restart unless-stopped -p 8080:80 faisalmuzaffar/pak-tools:latest
```

### Docker Compose

```yaml
services:
  pak-tools:
    image: faisalmuzaffar/pak-tools:latest
    container_name: pak-tools
    restart: unless-stopped
    ports:
      - "8080:80"

```

## Contribute

This is a React Project with Typescript Material UI. We use icons from [Iconify](https://icon-sets.iconify.design)

### Project setup

```bash
git clone https://github.com/Faisalmuzaffar/paktools.git
cd paktools
npm i
npm run dev
```

### Create a new tool

```bash
npm run script:create:tool my-tool-name folder1 # npm run script:create:tool split pdf
```

For tools located under multiple nested directories, use:

```bash
npm run script:create:tool my-tool-name folder1/folder2 # npm run script:create:tool compress image/png
```

Use `folder1\folder2` on Windows.

### Run tests

```bash
npm run test
```

- For e2e tests

```bash
npm run test:e2e
```

<img src="https://api.star-history.com/svg?repos=Faisalmuzaffar/paktools&type=Date"/>

## 🤝 Looking to contribute?

We welcome contributions! You can help by:

- ✅ Reporting bugs
- ✅ Suggesting new features in Github issues or [here](https://tally.so/r/nrkkx2)
- ✅ Improving documentation
- ✅ Submitting pull requests

You can also join our [Discord server](https://discord.gg/SDbbn3hT4b)

## Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Faisalmuzaffar/paktools)

### Manual Deployment

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your forked repository
3. **Configure build settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Deploy** - Vercel will automatically build and deploy your app

### Environment Variables

Copy `.env.example` to `.env.local` and configure any necessary environment variables.

### Custom Domain

To use a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## GitHub Best Practices

This project follows GitHub best practices:

- **Conventional Commits**: Use conventional commit messages
- **Automated Testing**: CI/CD pipeline with GitHub Actions
- **Code Quality**: ESLint, Prettier, and TypeScript checks
- **Security**: Dependabot for dependency updates
- **Documentation**: Comprehensive README and inline comments

### Contributors

<a href="https://github.com/Faisalmuzaffar/paktools/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Faisalmuzaffar/paktools" />
</a>

## Contact

For any questions or suggestions, feel free to open an issue or contact me at:
[faisalmuzafafr143786@gmail.com](mailto:faisalmuzafafr143786@gmail.com)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
