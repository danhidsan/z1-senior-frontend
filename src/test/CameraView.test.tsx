import React from 'react'
import { shallow } from 'enzyme'

import CameraView from '../views/CameraView/CameraView'

describe('<CameraView /> unit tests', () => {
  beforeEach(() => {
    const useEffect = jest
      .spyOn(React, 'useEffect')
      .mockImplementation((f) => f())
  })

  it('Render static elements', () => {
    const wrapper = shallow(
      <CameraView
        onClickCancel={() => undefined}
        onObtainResult={() => undefined}
        onTakePicture={() => undefined}
      />
    )

    expect(wrapper.find('div div.camera-title').text()).toEqual('Take picture')
    expect(wrapper.find('div div.camera-text').text()).toEqual(
      'Fit your ID card inside the frame. The picture will be taken automatically.'
    )
    expect(wrapper.find('div div.camera-cancel').text()).toEqual('CANCEL')
    expect(wrapper.find('div canvas').length).toEqual(1)
    expect(wrapper.find('div video').length).toEqual(1)
  })

  it('Render dynamics elemente result state = undefined', () => {
    const wrapper = shallow(
      <CameraView
        onClickCancel={() => undefined}
        onObtainResult={() => undefined}
        onTakePicture={() => undefined}
      />
    )
  })
})
