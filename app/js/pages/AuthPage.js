'use strict'

import { Component }   from 'react'
import { Link }        from 'react-router'
import DocumentTitle   from 'react-document-title'
//import { decodeToken, SECP256K1Client, TokenSigner } from 'jsontokens'
import { makeAuthResponse, makeECPrivateKey, getAuthRequestFromURL, redirectUserToApp } from 'blockstack'
//import { Person, fetchAppManifest, publicKeyToAddress, makeDIDFromAddress, makeUUID4, nextMonth } from 'blockstack'

class AuthPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      authRequest: null,
      appURI: null
    }

    this.signIn = this.signIn.bind(this)
    this.getAuthRequest = this.getAuthRequest.bind(this)
  }

  componentWillMount() {
    this.getAuthRequest()
  }

  getAuthRequest() {
    const authRequest = getAuthRequestFromURL()
    this.setState({
      authRequest: authRequest
    })
    /*
    fetchAppManifest(authRequest).then(appManifest => {
    }).catch((e) => {
      console.log(e.stack)
    })*/
  }

  signIn() {
    const privateKey = makeECPrivateKey()
    const profile = {
      '@type': 'Person',
      'name': 'Anonymous',
      'image': [
        {
          '@type': 'ImageObject',
          'name': 'avatar',
          'contentUrl': 'https://s3.amazonaws.com/onename/avatar-placeholder.png'
        }
      ]
    }
    const authResponse = makeAuthResponse(privateKey, profile)
    if (this.state.authRequest) {
      redirectUserToApp(this.state.authRequest, authResponse)
    }
  }

  render() {
    return (
      <DocumentTitle title="Sign In with Blockstack">
        <div>
          <section className="container-fluid spacing-container">
            <div className="container col-centered">
              <div className="container m-b-5" style={{ minHeight: '800px' }}>
                <h1>
                  Sign in with Blockstack
                </h1>
                <div>
                  <h4>
                    You're here because you clicked "Sign in with
                    Blockstack" and you don't have the Blockstack app.
                  </h4>
                  <p>
                    <Link to="/install" className="btn btn-outline-primary">
                      Install Blockstack
                    </Link>
                  </p>
                  {this.state.authRequest ?
                    <div>
                      <h4>
                        - or -
                      </h4>
                      <p>
                        <Link className="btn btn-secondary"
                              onClick={this.signIn}>
                          Quick Sign In
                        </Link>
                      </p>
                    </div>
                  : null }
                  <p><i>
                    Note: If you already have Blockstack,
                    go to your settings page in Blockstack and
                    enable the auth protocol handler,
                    then go to the app and try signing in again.
                  </i></p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DocumentTitle>
    )
  }

}

export default AuthPage