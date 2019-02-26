import {shallow} from 'enzyme';
import Counter from '../index';

const props = {};

describe('test title', () => {
    const wrapper = shallow(<Counter {...props} />);

    it('has 2 Button', () => {
        expect(wrapper.find('Button').length).toBe(2);
    })
});
