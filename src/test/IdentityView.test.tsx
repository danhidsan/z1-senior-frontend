import React from 'react'
import { shallow } from 'enzyme'

import IdentityView from '../views/IdentityView/IdentityView'

describe('<IdentityView /> unit tests', () => {
  it('Render accepted prop equal true', () => {
    const wrapper = shallow(
      <IdentityView
        accepted
        image="image uri"
        onClickTakePicture={() => undefined}
      />
    )

    expect(wrapper.find('div header').text()).toBe('BankClient')
    expect(wrapper.find('div div').length).toEqual(3)
    expect(wrapper.find('div div.title').text()).toEqual('Scan your ID')
    expect(wrapper.find('div div.info-text').text()).toEqual(
      'Take a picture. It may take time to validate your personal information.'
    )
    expect(
      wrapper
        .find('div div.identity-card-container')
        .children()
        .find('IdentityCard').length
    )
  })

  it('Render accepted prop equal false', () => {
    const wrapper = shallow(
      <IdentityView
        accepted={false}
        image="image uri"
        onClickTakePicture={() => undefined}
      />
    )

    expect(wrapper.find('div header').text()).toBe('BankClient')
    expect(wrapper.find('div div').length).toEqual(3)
    expect(wrapper.find('div div.title').text()).toEqual('Scan your ID')
    expect(wrapper.find('div div.info-text').text()).toEqual(
      'Take a picture. It may take time to validate your personal information.'
    )
    expect(
      wrapper
        .find('div div.identity-card-container')
        .children()
        .find('IdentityCard').length
    )
  })
})
