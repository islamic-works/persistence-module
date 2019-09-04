# Módulo de Persistência

Módulo para integração do sistema de persistência adotado com a aplicação, estas classes devem encapsular e abstrair juntamente com as do módulo de entidades toda a camada de persistência de forma a torna-la independente do sistema adotado, a aplicação não deve estar acoplada diretamente ao sistema de persistência final escolhido.

```
    users: {
        000001: {
            name: "Carlos Delfino",
            desription: "Administrador",
            roles: [...]
            others...,
            position: {lat: -3, lgt: 48, updated: 7777797777}
        },
        000002: {
            name: "Outro usuário",
            desription: "",
            roles: [...]
            others...,
            position: {lat: -3, lgt: 48}
        }
    }
    users_history_position:{
        000001: {
            "7777777777":{lat: -3.3, lgt: 48.3},
            "7777777877":{lat: -3.4, lgt: 48.3},
            "7777797777":{lat: -3.4, lgt: 48.5},
        }
    }
```

## Apoio e Patrocinio

<a href="https://www.patreon.com/bePatron?u=12060988" data-patreon-widget-type="become-patron-button">Become a Patron!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>


https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CWUDP66Q95W44&source=url

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="CWUDP66Q95W44" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1" />
  <img alt="QR Code" border="1" src="./docs/PayPal-QR Code.png"/>
</form>

