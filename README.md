# Smart Light Card

A stylish light control card for Home Assistant with smooth animations and a modern design.

[![HACS Default][hacs-shield]][hacs]
![GitHub Release](https://img.shields.io/github/v/release/Sr-0w/Better-Cards)
[![License][license-shield]](LICENSE)

![Preview](preview.gif)

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend" under "Integrations"
3. Click the "+ Explore & Download Repositories" button
4. Search for "Smart Light Card"
5. Click "Download"
6. Restart Home Assistant

### Manual Installation

1. Download `smart-light-card.js` from the latest release
2. Copy it to `config/www/` in your Home Assistant installation
3. Add the following to your `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/smart-light-card.js
```

4. Restart Home Assistant

## Usage

Add the card to your dashboard:

```yaml
type: custom:smart-light-card
entity: light.your_light
name: Living Room
show_brightness: true
animation_duration: 500
```

### Configuration Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **Required** | Home Assistant entity ID |
| `name` | string | Entity name | Name to display on the card |
| `show_brightness` | boolean | `true` | Show brightness slider |
| `animation_duration` | number | `500` | Animation duration in milliseconds |

## Development

1. Clone this repository
2. Install dependencies with `npm install`
3. Start development server with `npm run watch`
4. Build with `npm run build`

## License

This project is under the MIT License. See the [LICENSE](LICENSE) file for details.

[hacs-shield]: https://img.shields.io/badge/HACS-Default-orange.svg
[hacs]: https://github.com/hacs/integration
[releases-shield]: https://img.shields.io/github/release/yourusername/smart-light-card.svg
[releases]: https://github.com/yourusername/smart-light-card/releases
[license-shield]: https://img.shields.io/github/license/yourusername/smart-light-card.svg
