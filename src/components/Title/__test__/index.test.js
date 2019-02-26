import {shallow, render, mount} from 'enzyme';
import Title from '../index';

const props = {};

describe('test title', () => {
    const wrapper = shallow(<Title {...props} />);

    it('has a title named FExpy', () => {
        expect(wrapper.find('h1').text()).toBe('FExpy');
    })
});