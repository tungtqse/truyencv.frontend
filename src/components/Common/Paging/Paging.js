import React from 'react';
import {SKIP_DEFAULT, MAX_PAGE} from '../../../core/constants';

class Paging extends React.Component{

    state = {skip : SKIP_DEFAULT, paging: {currentPage: 1, nextPage: 2, previousPage: 0}}

    renderPagination = () => {        
        
        let page = [];
        
        if(!this.props.count){
            return;
        } 
        
        const totalPage = Math.ceil(this.props.count / this.props.take);
        const {previousPage, nextPage, currentPage} = this.state.paging;

        let indexPage = this.calculatePage(MAX_PAGE,totalPage,currentPage);

        if(currentPage !== 1){
            page.push(<span key="first" title="First Page" className="item" onClick={() => this.pageOnClick(1)}> « </span>);
            page.push(<span key="previous" title="Previous Page" className="item" onClick={() => this.pageOnClick(previousPage)}> ⟨ </span>);
        }

        let countPage = 0;
       
        for (let index = indexPage; index <= totalPage; index++) {

            page.push(<span key={index} className={(index === currentPage) ? "active item" : "item"} onClick={() => this.pageOnClick(index)}> {index} </span>);       
            
            countPage++;
            
            if(countPage === MAX_PAGE){               
                break;
            }          
        }       

        if(currentPage < totalPage){
            page.push(<span key="next" title="Next Page" className="item" onClick={() => this.pageOnClick(nextPage)}> ⟩ </span>);
            page.push(<span key="last" title="Last Page" className="item" onClick={() => this.pageOnClick(totalPage)}> » </span>);
        }        

        return page;
    }

    calculatePage(maxPage , totalPage, currentPage){    
          
        if(currentPage !== 1){            
            if( ( maxPage + currentPage) <= totalPage || maxPage > totalPage){
                return currentPage;
            }
            else{               
                // let tmp = (maxPage + currentPage - 1) - totalPage;
                // return (currentPage - tmp);
                return (totalPage - maxPage + 1);
            }            
        }

        return 1;
    }

    pageOnClick = (page) => {         
        
        let {currentPage, nextPage, previousPage} = this.state.paging;

        if(page !== currentPage){
            currentPage = page;
            nextPage = (page !== this.props.count) ? page + 1 : page;
            previousPage = (page !== 1) ? page - 1 : 0;
            let skipNew = (page - 1) * this.props.take;

            this.setState({
                skip: skipNew,
                paging :{currentPage : currentPage, nextPage:nextPage, previousPage:previousPage}
            });
        }        
    }

    componentDidUpdate(prevProps, prevState){       
        if(prevState !== this.state){
            this.props.pageOnClick(this.state.skip);
        }        
    }

    render(){
        return(
            <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu common-pagination">
                {this.renderPagination()}
            </div>
        )
    }
}

export default Paging;