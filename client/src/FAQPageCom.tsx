import React, {useEffect, useState} from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Grid } from '@material-ui/core'
import { makeStyles }from '@material-ui/core/styles'
import styles from './styles';

interface FaqItem {
    title: string;
    content: string;
}

const useStyles =  makeStyles(theme => (styles(theme)));

const FAQPageCom: React.FC = () => {

    const [faqArray, setfaqArray] = useState<Array<FaqItem>>([])
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const classes = useStyles();
    
    useEffect(() => {
        let faqs: Array<FaqItem> = []
        faqs.push({title: 'Do I have to create an account to make purchases?', content: 'Yes. We have plans to allow guest purchasing in the future, but at the moment all purchases must be made through an account.'})
        faqs.push({title: 'How can I view my purchase history?', content: 'Your purchase history can be found on your profile page.'})
        faqs.push({title: 'Do I need to enter in my shipping and billing address on my profile before making a purchase?', content: 'Yes. You can enter in your billing and shipping address on your profile page. Please do so before proceeding to make a purchase.'})
        faqs.push({title: 'Can I change the size of the posters?', content: 'No, our current selection of products are 3\'x1\'.'})
        faqs.push({title: 'What material are the products made from?', content: 'Our products are made using sustainably sourced recycled paper.'})
        faqs.push({title: 'Can I cancel an order?', content: 'Not currently, so please review all purchases carefully.'})
        faqs.push({title: 'How are you avoiding copyright issues?', content: 'We currently do nothing to avoid copyright issues besides praying to not be sued out of existance.'})
        faqs.push({title: 'Can I use this website on my phone?', content: 'Yes this website is mobile friendly!'})
        faqs.push({title: 'What is the customer support contact information?', content: 'You can reach customer service at 1-800-ELM-PRNT or at elmprints@support.com'})
        faqs.push({title: 'How do I track my purchase?', content: 'This feature is coming soon!'})
        // console.log(faqs)
        setfaqArray(faqs);  
        // console.log(faqArray);
    },[])

    return(
        <Grid
            container 
    		direction="row"
    		justify="space-evenly"
            alignItems="center"
            className="faqContainer"
        >
            {
                faqArray.map((faq,i) => (
                    <Grid item xs={8} key={i}>
                        <ExpansionPanel style={{backgroundColor: "#f1e2d6"}} className="faqItem" expanded={expanded === `faq${i}`} onChange={handleChange(`faq${i}`)}>
                            <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`faq${i}-content`}
                            id={`faq${i}-header`}
                            >
                                <Typography className={classes.heading}>{faq.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                  {faq.content}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default FAQPageCom